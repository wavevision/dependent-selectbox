<?php declare (strict_types = 1);

namespace Wavevision\DependentSelectBox;

use Nette\Forms\Controls\BaseControl;
use Nette\Forms\Controls\SelectBox;
use Nette\Utils\Html;
use Wavevision\Utils\Arrays;

class DependentSelectBox extends SelectBox
{

	use DependentSelectBoxUtils;

	/**
	 * @var bool
	 */
	private $autoSelectSingleValue = false;

	/**
	 * @var ConditionalParent[]
	 */
	private $conditionalParents = [];

	/**
	 * @var callable
	 */
	private $dependentCallback;

	/**
	 * @var bool
	 */
	private $disabledWhenEmpty = false;

	/**
	 * @var BaseControl[]
	 */
	private $parents;

	/**
	 * @param string $label
	 * @param BaseControl[] $parents
	 */
	public function __construct(string $label, array $parents)
	{
		parent::__construct($label);
		$this->parents = $parents;
	}

	public function getControl(): Html
	{
		$control = parent::getControl();
		$control->addAttributes(
			[
				'data-dependent-select-box' => true,
				'data-parents' => $this->createParentsAttribute(),
			]
		);
		return $control;
	}

	/**
	 * @param BaseControl $parent
	 * @param BaseControl $ancestor
	 * @param mixed $onAncestorValue
	 * @return DependentSelectBox
	 */
	public function addConditionalParent(
		BaseControl $parent,
		BaseControl $ancestor,
		$onAncestorValue
	): DependentSelectBox {
		if (!isset($this->conditionalParents[$parent->getHtmlId()])) {
			$this->conditionalParents[$parent->getHtmlId()] = new ConditionalParent(
				$parent,
				$ancestor,
				$onAncestorValue
			);
		}
		return $this;
	}

	/**
	 * @return ConditionalParent[]
	 */
	public function getConditionalParents(): array
	{
		return $this->conditionalParents;
	}

	/**
	 * @param array<int|string|null> $parentsValues
	 * @param int|string|null $selectedValue
	 * @return DependentData
	 * @throws DependentCallbackException
	 */
	public function getDependentData(array $parentsValues = [], $selectedValue = null): DependentData
	{
		if (!is_callable($this->dependentCallback)) {
			throw new DependentCallbackException(
				sprintf('Dependent callback for "%s" must be set.', $this->getHtmlId())
			);
		}
		if (!$this->isDependentDataReady($parentsValues)) {
			return $this->getDefaultData();
		}
		$dependentData = ($this->dependentCallback)(
			new DependentValues($parentsValues, $this->getCurrentContainerValues($parentsValues), $selectedValue)
		);
		if (!($dependentData instanceof DependentData)) {
			throw new DependentCallbackException(
				sprintf(
					'Dependent callback for "%s" must return an instance of %s.',
					$this->getHtmlId(),
					DependentData::class
				)
			);
		}
		$this->setItems($dependentData->getItems());
		if ($dependentData->isDisabled() === null) {
			$dependentData->setDisabled($this->isDisabled());
		}
		if ($dependentData->getPrompt() === null) {
			$dependentData->setPrompt($this->getCurrentPrompt());
		}
		if ($dependentData->getValue() === null) {
			$dependentData->setValue($selectedValue);
		}
		if ($dependentData->getPrompt() !== null) {
			$this->setPrompt($dependentData->getPrompt());
		}
		$this->resolveValue($dependentData);
		$dependentData->setOptions($this->getOptionsHtml());
		return $dependentData;
	}

	/**
	 * @return int|string|null
	 */
	public function getValue()
	{
		if ($this->isSubmitted()) {
			$this->loadHttpData();
			return $this->getRawValue();
		}
		return parent::getValue();
	}

	public function isDisabled(): bool
	{
		if ($this->disabledWhenEmpty) {
			if ($this->isSubmitted()) {
				return $this->getValue() === null;
			}
			return Arrays::isEmpty($this->getItems());
		}
		return parent::isDisabled();
	}

	/**
	 * @return BaseControl[]
	 */
	public function getParents(): array
	{
		return $this->parents;
	}

	public function setAutoSelectSingleValue(bool $autoSelectSingleValue = true): DependentSelectBox
	{
		$this->autoSelectSingleValue = $autoSelectSingleValue;
		return $this;
	}

	public function setDependentCallback(callable $dependentCallback): DependentSelectBox
	{
		$this->dependentCallback = $dependentCallback;
		return $this;
	}

	public function setDisabledWhenEmpty(bool $disabledWhenEmpty = true): DependentSelectBox
	{
		$this->disabledWhenEmpty = $disabledWhenEmpty;
		return $this;
	}

}

<?php declare(strict_types = 1);

namespace Wavevision\DependentSelectBox;

use Nette\Application\UI\Form;
use Nette\Forms\Controls\BaseControl;
use Nette\Utils\Json;
use Wavevision\Utils\Arrays;

/**
 * @property-read ConditionalParent[] $conditionalParents
 * @property-read Form $form
 * @property-read BaseControl[] $parents
 */
trait DependentSelectBoxUtils
{

	private function createParentsAttribute(): string
	{
		$parents = [];
		foreach ($this->parents as $parent) {
			$parents[] = $parent->getHtmlId();
		}
		foreach ($this->conditionalParents as $parent) {
			if (!in_array($parent->getAncestor()->getHtmlId(), $parents)) {
				$parents[] = $parent->getAncestor()->getHtmlId();
			}
		}
		return Json::encode(array_merge($parents, array_keys($this->conditionalParents)));
	}

	/**
	 * @param mixed[] $values
	 * @return mixed[]
	 */
	private function getCurrentContainerValues(array $values): array
	{
		$names = [];
		/** @var DependentSelectBox $container */
		$container = $this;
		while ($container = $container->getParent()) {
			if ($container instanceof Form) {
				break;
			}
			array_unshift($names, $container->getName());
		}
		foreach ($names as $name) {
			$values = $values[$name];
		}
		return $values;
	}

	private function getCurrentPrompt(): string
	{
		if (Arrays::isEmpty($this->getItems())) {
			return (string)$this->translate($this->getPrompt());
		}
		return (string)$this->translate('forms.general.choose');
	}

	private function getDefaultData(): DependentData
	{
		$data = new DependentData();
		$data->setDisabled($this->isDisabled())
			->setPrompt($this->getCurrentPrompt())
			->setOptions($this->getOptionsHtml());
		return $data;
	}

	private function getOptionsHtml(): string
	{
		$options = $this->getControl()->getChildren();
		return reset($options);
	}

	/**
	 * @param mixed[] $parentsValues
	 * @return bool
	 */
	private function isDependentDataReady(array $parentsValues): bool
	{
		foreach ($parentsValues as $value) {
			if ($value === null) {
				return false;
			}
			if (is_array($value) && !$this->isDependentDataReady($value)) {
				return false;
			}
		}
		return true;
	}

	private function isSubmitted(): bool
	{
		return $this->form->isAnchored() && $this->form->isSubmitted();
	}

	private function resolveValue(DependentData $dependentData): void
	{
		if ($this->autoSelectSingleValue && count($this->getItems()) === 1) {
			$value = key($dependentData->getItems());
		} else {
			$value = $dependentData->getValue();
		}
		if ($value !== null) {
			$this->setValue($value);
		}
	}
}

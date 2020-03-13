<?php declare(strict_types = 1);

namespace Wavevision\DependentSelectBox;

use Nette\ComponentModel\IComponent;
use Nette\Forms\Controls\BaseControl;
use Nette\Forms\Form;
use Nette\SmartObject;
use Nette\Utils\Json;
use Nette\Utils\JsonException;
use Wavevision\Utils\Arrays;

class LoadDependentData
{

	use SmartObject;

	public const TRIGGER = 'trigger';

	public const VALUES = 'values';

	/**
	 * @param DependentSelectBox[] $dependentSelectBoxes
	 * @return array<int|string, array<string, bool|string|null>>
	 * @throws DependentCallbackException
	 * @throws JsonException
	 */
	public function process(array $dependentSelectBoxes, string $json): array
	{
		$options = [];
		$request = Json::decode($json, Json::FORCE_ARRAY);
		foreach ($this->getSelectBoxesToRender($dependentSelectBoxes, $request) as $selectBox) {
			$values = $this->getAllValues($selectBox, $request[self::VALUES]);
			$dependentData = $selectBox->getDependentData(
				$values,
				$this->getValue($selectBox, $request[self::VALUES])
			);
			$options[$selectBox->getHtmlId()] = [
				'disabled' => $dependentData->isDisabled(),
				'options' => $dependentData->getOptions(),
			];
		}
		return $options;
	}

	/**
	 * @param DependentSelectBox[] $dependentSelectBoxes
	 * @param mixed[] $data
	 * @return DependentSelectBox[]
	 */
	private function getSelectBoxesToRender(array $dependentSelectBoxes, array $data): array
	{
		$trigger = $data[self::TRIGGER];
		return array_filter(
			$dependentSelectBoxes,
			function (DependentSelectBox $dependentSelectBox) use ($trigger): bool {
				return $this->containsParent($dependentSelectBox, $trigger);
			}
		);
	}

	private function containsParent(DependentSelectBox $dependentSelectBox, string $htmlId): bool
	{
		//TODO: Look for parents recursively
		foreach ($dependentSelectBox->getParents() as $control) {
			if ($control->getHtmlId() === $htmlId) {
				return true;
			}
		}
		foreach ($dependentSelectBox->getConditionalParents() as $conditionalParent) {
			if ($conditionalParent->getParent()->getHtmlId() === $htmlId) {
				return true;
			}
		}
		return false;
	}

	/**
	 * @param mixed[] $data
	 * @return mixed[]
	 */
	private function getAllValues(DependentSelectBox $dependentSelectBox, array $data): array
	{
		return Arrays::mergeTree(
			$this->getParentsValues($dependentSelectBox, $data),
			$this->getConditionalParentsValues($dependentSelectBox, $data)
		);
	}

	/**
	 * @param mixed[] $data
	 * @return mixed[]
	 */
	private function getConditionalParentsValues(DependentSelectBox $dependentSelectBox, array $data): array
	{
		$values = [];
		foreach ($dependentSelectBox->getConditionalParents() as $parent) {
			if (isset($data[$parent->getAncestor()->getHtmlName()])) {
				if ($data[$parent->getAncestor()->getHtmlName()] === $parent->getOnAncestorValue()) {
					$this->resolveContainer($parent->getParent(), $data, $values);
				}
			}
		}
		return $values;
	}

	/**
	 * @return array<string|null>
	 */
	private function getContainerPath(IComponent $control): array
	{
		$path = [];
		if ($control->getParent() !== null && !($control->getParent() instanceof Form)) {
			foreach ($this->getContainerPath($control->getParent()) as $name) {
				$path[] = $name;
			}
			$path[] = $control->getParent()->getName();
		}
		return $path;
	}

	/**
	 * @param mixed[] $data
	 * @return mixed[]
	 */
	private function getParentsValues(DependentSelectBox $dependentSelectBox, array $data): array
	{
		$values = [];
		foreach ($dependentSelectBox->getParents() as $parent) {
			$this->resolveContainer($parent, $data, $values);
		}
		return $values;
	}

	/**
	 * @param mixed[] $data
	 * @return int|string|null
	 */
	private function getValue(BaseControl $control, array $data)
	{
		return $data[$control->getHtmlName()] ?? null;
	}

	/**
	 * @param mixed[] $data
	 * @param mixed[] $values
	 */
	private function resolveContainer(BaseControl $control, array $data, array &$values): void
	{
		$container = $this->getContainerPath($control);
		if (Arrays::isEmpty($container)) {
			$values[$control->getName()] = $this->getValue($control, $data);
		} else {
			$temp = &$values;
			foreach ($container as $name) {
				$temp = &$temp[$name];
			}
			$temp[$control->getName()] = $this->getValue($control, $data);
			unset($temp);
		}
	}

}

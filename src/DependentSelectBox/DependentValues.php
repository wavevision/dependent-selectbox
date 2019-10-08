<?php declare(strict_types = 1);

namespace Wavevision\DependentSelectBox;

use Nette\SmartObject;
use Nette\Utils\ArrayHash;

class DependentValues
{

	use SmartObject;

	/**
	 * @var array<int|string|null>
	 */
	private $values;

	/**
	 * @var array<int|string|null>
	 */
	private $containerValues;

	/**
	 * @var int|string|null
	 */
	private $selectedValue;

	/**
	 * @param array<int|string|null> $values
	 * @param array<int|string|null> $containerValues
	 * @param int|string|null $selectedValue
	 */
	public function __construct(array $values, array $containerValues, $selectedValue)
	{
		$this->values = $values;
		$this->containerValues = $containerValues;
		$this->selectedValue = $selectedValue;
	}

	/**
	 * @return int|string|null
	 */
	public function getSelectedValue()
	{
		return $this->selectedValue;
	}

	/**
	 * @return array<int|string|null>
	 */
	public function getRawValues(): array
	{
		return $this->values;
	}

	/**
	 * @return array<int|string|null>
	 */
	public function getContainerRawValues(): array
	{
		return $this->containerValues;
	}

	public function getValues(): ArrayHash
	{
		return $this->format($this->values);
	}

	/**
	 * @param string $name
	 * @return int|string|null
	 */
	public function getSingleValue(string $name)
	{
		return $this->getContainerValues()[$name];
	}

	public function getContainerValues(): ArrayHash
	{
		return $this->format($this->containerValues);
	}

	/**
	 * @param array<int|string|null> $values
	 * @return ArrayHash
	 */
	private function format(array $values): ArrayHash
	{
		return ArrayHash::from($values);
	}
}

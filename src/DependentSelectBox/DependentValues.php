<?php declare(strict_types = 1);

namespace Wavevision\DependentSelectBox;

use Nette\SmartObject;
use Nette\Utils\ArrayHash;

class DependentValues
{

	use SmartObject;

	/**
	 * @var mixed[]
	 */
	private array $values;

	/**
	 * @var mixed[]
	 */
	private array $containerValues;

	/**
	 * @var int|string|null
	 */
	private $selectedValue;

	/**
	 * @param mixed[] $values
	 * @param mixed[] $containerValues
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
	 * @return mixed[]
	 */
	public function getRawValues(): array
	{
		return $this->values;
	}

	/**
	 * @return mixed[]
	 */
	public function getContainerRawValues(): array
	{
		return $this->containerValues;
	}

	public function getValues(): ArrayHash
	{
		return $this->format($this->values);
	}

	public function getContainerValues(): ArrayHash
	{
		return $this->format($this->containerValues);
	}

	/**
	 * @param mixed[] $values
	 */
	private function format(array $values): ArrayHash
	{
		return ArrayHash::from($values);
	}

}

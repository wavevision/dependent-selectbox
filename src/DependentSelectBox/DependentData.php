<?php declare(strict_types = 1);

namespace Wavevision\DependentSelectBox;

use Nette\SmartObject;
use function is_scalar;

class DependentData
{

	use SmartObject;

	private ?bool $disabled = null;

	/**
	 * @var array<int|string>
	 */
	private array $items = [];

	private ?string $options = null;

	private ?string $prompt = null;

	/**
	 * @var int|string|null
	 */
	private $value;

	public function isDisabled(): ?bool
	{
		return $this->disabled;
	}

	public function setDisabled(bool $disabled): DependentData
	{
		$this->disabled = $disabled;
		return $this;
	}

	/**
	 * @return array<int|string>
	 */
	public function getItems(): array
	{
		return $this->items;
	}

	/**
	 * @param array<int|string> $items
	 */
	public function setItems(array $items): DependentData
	{
		$this->items = $items;
		return $this;
	}

	public function getOptions(): ?string
	{
		return $this->options;
	}

	public function setOptions(string $options): DependentData
	{
		$this->options = $options;
		return $this;
	}

	public function getPrompt(): ?string
	{
		return $this->prompt;
	}

	public function setPrompt(string $prompt): DependentData
	{
		$this->prompt = $prompt;
		return $this;
	}

	/**
	 * @return int|string|null
	 */
	public function getValue()
	{
		return $this->value;
	}

	/**
	 * @param int|string|null $value
	 */
	public function setValue($value): DependentData
	{
		if (is_scalar($value)) {
			$this->value = $value;
		}
		return $this;
	}

}

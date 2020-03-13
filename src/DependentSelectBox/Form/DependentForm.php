<?php declare(strict_types = 1);

namespace Wavevision\DependentSelectBox\Form;

use Nette\Forms\Controls\BaseControl;
use Wavevision\DependentSelectBox\DependentSelectBox;

trait DependentForm
{

	use DependentControl;

	/**
	 * @var DependentSelectBox[]
	 */
	private array $dependentSelectBoxes = [];

	/**
	 * @return DependentSelectBox[]
	 */
	public function getDependentSelectBoxes(): array
	{
		/** @var DependentSelectBox $control */
		foreach ($this->getControls() as $control) {
			if ($this->isDependentSelectBox($control)) {
				$this->dependentSelectBoxes[$control->getHtmlId()] = $control;
			}
		}
		return $this->dependentSelectBoxes;
	}

	private function isDependentSelectBox(BaseControl $control): bool
	{
		return $control instanceof DependentSelectBox && !isset($this->dependentSelectBoxes[$control->getHtmlId()]);
	}

}

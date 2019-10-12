<?php declare(strict_types = 1);

namespace Wavevision\DependentSelectBox\Form;

use Iterator;
use Nette\Forms\Controls\BaseControl;
use Wavevision\DependentSelectBox\DependentSelectBox;

trait DependentControls
{

	/**
	 * @var DependentSelectBox[]
	 */
	private $dependentSelectBoxes = [];

	public function getControls(): Iterator
	{
		$controls = parent::getControls();
		foreach ($controls as $control) {
			$this->addDependentSelectBoxControl($control);
		}
		return $controls;
	}

	/**
	 * @return DependentSelectBox[]
	 */
	public function getDependentSelectBoxes(): array
	{
		return $this->dependentSelectBoxes;
	}

	private function addDependentSelectBoxControl(BaseControl $control): void
	{
		if ($control instanceof DependentSelectBox) {
			$this->dependentSelectBoxes[] = $control;
		}
	}
}

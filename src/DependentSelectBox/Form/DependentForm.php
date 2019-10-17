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
	private $dependentSelectBoxes = [];

	/**
	 * @return DependentSelectBox[]
	 */
	public function getDependentSelectBoxes(): array
	{
		/** @var BaseControl $control */
		foreach ($this->getControls() as $control) {
			$id = $control->getHtmlId();
			if ($control instanceof DependentSelectBox && !isset($this->dependentSelectBoxes[$id])) {
				$this->dependentSelectBoxes[$id] = $control;
			}
		}
		return $this->dependentSelectBoxes;
	}
}

<?php declare(strict_types = 1);

namespace Wavevision\DependentSelectBox\Form;

use Nette\Forms\Controls\BaseControl;
use Wavevision\DependentSelectBox\DependentSelectBox;

trait DependentControl
{

	/**
	 * @param string $name
	 * @param string|object $label
	 * @param BaseControl ...$parents
	 * @return DependentSelectBox
	 */
	public function addDependentSelectBox(string $name, $label, BaseControl ...$parents): DependentSelectBox
	{
		return $this[$name] = new DependentSelectBox($label, $parents);
	}

}

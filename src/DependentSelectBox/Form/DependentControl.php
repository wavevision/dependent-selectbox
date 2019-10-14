<?php declare(strict_types = 1);

namespace Wavevision\DependentSelectBox\Form;

use Nette\Forms\Controls\BaseControl;
use Wavevision\DependentSelectBox\DependentSelectBox;

trait DependentControl
{

	public function addDependentSelectBox(string $name, string $label, BaseControl ...$parents): DependentSelectBox
	{
		return $this[$name] = new DependentSelectBox($label, $parents);
	}
}

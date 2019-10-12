<?php declare(strict_types = 1);

namespace Wavevision\DependentSelectBox\Form;

use Nette\Forms\Container as NetteContainer;
use Nette\Forms\Controls\BaseControl;
use Wavevision\DependentSelectBox\DependentSelectBox;

trait DependentContainer
{

	/**
	 * @param int|string $name
	 * @return Container
	 */
	public function addContainer($name): NetteContainer
	{
		$control = new Container();
		$control->currentGroup = $this->currentGroup;
		if ($this->currentGroup !== null) {
			$this->currentGroup->add($control);
		}
		return $this[$name] = $control;
	}

	public function addDependentSelectBox(string $name, string $label, BaseControl ...$parents): DependentSelectBox
	{
		return $this[$name] = new DependentSelectBox($label, $parents);
	}
}

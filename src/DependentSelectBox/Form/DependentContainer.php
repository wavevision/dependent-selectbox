<?php declare (strict_types = 1);

namespace Wavevision\DependentSelectBox\Form;

use Nette\Forms\Container as NetteContainer;

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

}

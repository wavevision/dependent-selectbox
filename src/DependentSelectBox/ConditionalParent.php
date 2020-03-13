<?php declare (strict_types = 1);

namespace Wavevision\DependentSelectBox;

use Nette\Forms\Controls\BaseControl;
use Nette\SmartObject;

class ConditionalParent
{

	use SmartObject;

	private BaseControl $ancestor;

	/**
	 * @var mixed
	 */
	private $onAncestorValue;

	private BaseControl $parent;

	/**
	 * @param mixed $onAncestorValue
	 */
	public function __construct(BaseControl $parent, BaseControl $ancestor, $onAncestorValue)
	{
		$this->ancestor = $ancestor;
		$this->onAncestorValue = $onAncestorValue;
		$this->parent = $parent;
	}

	public function getAncestor(): BaseControl
	{
		return $this->ancestor;
	}

	/**
	 * @return mixed
	 */
	public function getOnAncestorValue()
	{
		return $this->onAncestorValue;
	}

	public function getParent(): BaseControl
	{
		return $this->parent;
	}

}

<?php declare (strict_types = 1);

namespace Wavevision\DependentSelectBoxTests\Presenters;

use Nette\Application\UI\Presenter;

class TestPresenter extends Presenter
{

	public const COMPONENT = 'testComponent';

	public function actionDefault(): void
	{
		$this->addComponent(new TestComponent(), self::COMPONENT);
	}
}

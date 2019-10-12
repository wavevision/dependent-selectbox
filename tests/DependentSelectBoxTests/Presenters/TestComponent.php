<?php declare (strict_types = 1);

namespace Wavevision\DependentSelectBoxTests\Presenters;

use Nette\Application\UI\Control;
use Wavevision\DependentSelectBox\DependentComponent;
use Wavevision\DependentSelectBox\DependentData;
use Wavevision\DependentSelectBox\Form\Form;

class TestComponent extends Control
{

	use DependentComponent;

	public const FORM = 'testForm';

	public function __construct()
	{
		$this->addComponent($this->createForm(), self::FORM);
		$this->monitor(
			TestPresenter::class,
			function (): void {
				$this->dependentComponentSetup(self::FORM);
			}
		);
	}

	public function render(): void
	{
		$this->template->render(__DIR__ . '/templates/testComponent.latte');
	}

	private function createForm(): Form
	{
		$form = new Form();
		$form->addSelect('one', 'One', ['something', 'something else']);
		$container = $form->addContainer('container');
		$container->addSelect('conditionalAncestor', 'Conditional ancestor', ['haha', 'hehe']);
		$container->addText('conditional', 'Conditional');
		$form->addDependentSelectBox('two', 'Two', $form['one'])
			->setDependentCallback(
				function (): DependentData {
					return new DependentData();
				}
			)
			->addConditionalParent($container['conditional'], $container['conditionalAncestor'], 1);
		return $form;
	}
}

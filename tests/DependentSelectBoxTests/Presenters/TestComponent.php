<?php declare (strict_types = 1);

namespace Wavevision\DependentSelectBoxTests\Presenters;

use Nette\Application\UI\Control;
use Nette\Bridges\ApplicationLatte\Template;
use Wavevision\DependentSelectBox\DependentComponent;
use Wavevision\DependentSelectBox\DependentData;
use Wavevision\DependentSelectBox\Form\Form;

/**
 * @property-read Template $template
 */
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
		$one = $form->addSelect('one', 'One', ['something', 'something else']);
		$container = $form->addContainer('container');
		$conditionalAncestor = $container->addSelect('conditionalAncestor', 'Conditional ancestor', ['haha', 'hehe']);
		$conditional = $container->addText('conditional', 'Conditional');
		$radio = $form->addRadioList('radio', 'Hello', ['la', 'lala']);
		$dependentSelectbox = $form->addDependentSelectBox('two', 'Two', $one, $radio)
			->setDependentCallback(
				function (): DependentData {
					return new DependentData();
				}
			)
			->addConditionalParent($conditional, $conditionalAncestor, 1)
			->setDisabledWhenEmpty()
			->setDisallowSubmitWhenDisabled();
		$dependentSelectbox->getValue();
		$dependentSelectbox->isDisabled();
		return $form;
	}

}

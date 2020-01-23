<?php declare(strict_types = 1);

namespace Wavevision\DependentSelectBox;

use Nette\Application\UI\Form as NetteForm;
use Nette\Application\UI\Presenter;
use Nette\InvalidStateException;
use Wavevision\DependentSelectBox\Form\Form;

/**
 * @property-read Presenter $presenter
 */
trait DependentComponent
{

	/**
	 * @var LoadDependentData
	 */
	private $loadDependentData;

	/**
	 * @var string
	 */
	private $dependentForm = 'form';

	/**
	 * @return Form
	 */
	public function getDependentForm(): NetteForm
	{
		return $this[$this->dependentForm];
	}

	public function handleLoadDependentData(): void
	{
		$body = $this->presenter->getHttpRequest()->getRawBody();
		if (!$body) {
			throw new InvalidStateException('Request body not provided.');
		}
		$this->presenter->sendJson(
			$this->loadDependentData->process(
				$this->getDependentForm()->getDependentSelectBoxes(),
				$body
			)
		);
	} // @codeCoverageIgnore

	public function hasReceivedDependentSignal(): bool
	{
		$signal = $this->presenter->getSignal();
		if ($signal === null) {
			return false;
		}
		[$receiver, $signal] = $signal;
		return $receiver === $this->getName() && $signal === 'loadDependentData';
	}

	private function dependentComponentSetup(?string $form = null): void
	{
		if ($form) {
			$this->dependentForm = $form;
		}
		if (!($this->loadDependentData instanceof LoadDependentData)) {
			$this->loadDependentData = new LoadDependentData();
		}
		$form = $this->getDependentForm();
		$form->getElementPrototype()
			->setAttribute(
				'data-dependent-data-link',
				$this->link('loadDependentData!')
			);
		/** @param Form $form */
		$form->onSubmit[] = function (NetteForm $form): void {
			foreach ($form->getDependentSelectBoxes() as $selectBox) {
				$selectBox->getDependentData($form->getValues('array'), $selectBox->getValue());
			}
		};
	}

}

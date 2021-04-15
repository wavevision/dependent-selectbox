<?php declare(strict_types = 1);

namespace Wavevision\DependentSelectBox;

use Nette\Application\UI\Presenter;
use Nette\InvalidStateException;
use Wavevision\DependentSelectBox\Form\Form;

/**
 * @property-read Presenter $presenter
 */
trait DependentComponent
{

	private LoadDependentData $loadDependentData;

	private string $dependentForm = 'form';

	public function handleLoadDependentData(): void
	{
		$body = $this->presenter->getHttpRequest()->getRawBody();
		if (!$body) {
			throw new InvalidStateException('Request body not provided.');
		}
		/** @var Form $form */
		$form = $this[$this->dependentForm];
		$this->presenter->sendJson(
			$this->loadDependentData->process($form->getDependentSelectBoxes(), $body)
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
		if (!isset($this->loadDependentData)) {
			$this->loadDependentData = new LoadDependentData();
		}
		/** @var Form $form */
		$form = $this[$this->dependentForm];
		$form->getElementPrototype()
			->setAttribute(
				'data-dependent-data-link',
				$this->link('loadDependentData!')
			);
		$form->onSubmit[] = function () use ($form): void {
			foreach ($form->getDependentSelectBoxes() as $selectBox) {
				/** @var array<mixed> $values */
				$values = $form->getUnsafeValues('array');
				$selectBox->getDependentData($values, $selectBox->getValue());
			}
		};
	}

}

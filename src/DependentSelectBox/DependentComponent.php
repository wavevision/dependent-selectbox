<?php declare(strict_types = 1);

namespace Wavevision\DependentSelectBox;

use Nette\Application\UI\Presenter;
use Nette\InvalidStateException;

/**
 * @property-read Presenter $presenter
 */
trait DependentComponent
{

	/**
	 * @var LoadDependentData
	 */
	protected $loadDependentData;

	/**
	 * @var string
	 */
	private $dependentForm = 'form';

	public function handleLoadDependentData(): void
	{
		$body = $this->presenter->getHttpRequest()->getRawBody();
		if (!$body) {
			throw new InvalidStateException('Request body not provided.');
		}
		$this->presenter->sendJson(
			$this->loadDependentData->process(
				$this[$this->dependentForm]->getDependentSelectBoxes(),
				$body
			)
		);
	}

	private function dependentComponentSetup(?string $form = null): void
	{
		if ($form && strlen($form) > 0) {
			$this->dependentForm = $form;
		}
		if (!($this->loadDependentData instanceof LoadDependentData)) {
			$this->loadDependentData = new LoadDependentData();
		}
		$this[$this->dependentForm]->getElementPrototype()
			->setAttribute(
				'data-dependent-data-link',
				$this->link('loadDependentData!')
			);
	}

	private function hasReceivedDependentSignal(): bool
	{
		$parameters = $this->presenter->getParameters();
		return isset($parameters['do']) && strpos($parameters['do'], 'loadDependentData') !== false;
	}
}

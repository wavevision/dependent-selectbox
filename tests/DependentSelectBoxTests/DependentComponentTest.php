<?php declare (strict_types = 1);

namespace Wavevision\DependentSelectBoxTests;

use Nette\Application\IPresenterFactory;
use Nette\Application\IResponse;
use Nette\Application\PresenterFactory;
use Nette\Application\Request;
use Nette\Application\Responses\JsonResponse;
use Nette\Application\Responses\TextResponse;
use Nette\Http\IRequest;
use Nette\InvalidStateException;
use Nette\Utils\Json;
use PHPUnit\Framework\TestCase;
use Wavevision\DependentSelectBox\LoadDependentData;
use Wavevision\DependentSelectBoxTests\Presenters\TestComponent;
use Wavevision\DependentSelectBoxTests\Presenters\TestPresenter;

class DependentComponentTest extends TestCase
{

	public function testDefault(): void
	{
		$this->assertInstanceOf(
			TextResponse::class,
			$this->runPresenter(['do' => $this->getFormSubmit()], ['one' => '1'], null, false)
		);
	}

	public function testHandleLoadDependentData(): void
	{
		$response = $this->runPresenter(
			$this->getComponentSignal(),
			[],
			Json::encode(
				[
					LoadDependentData::DATA => ['one' => 1, 'container[conditionalAncestor]' => 1],
					LoadDependentData::TRIGGER => $this->getFormParam('one'),
				]
			)
		);
		$this->assertInstanceOf(JsonResponse::class, $response);
		$this->assertIsArray($response->getPayload());
	}

	public function testHandleLoadDependentDataThrowsException(): void
	{
		$this->expectException(InvalidStateException::class);
		$this->runPresenter($this->getComponentSignal());
	}

	/**
	 * @param mixed[] $query
	 * @param mixed[] $post
	 * @param string|null $rawBody
	 * @param bool $ajax
	 * @return IResponse
	 */
	private function runPresenter(
		array $query = [],
		array $post = [],
		?string $rawBody = null,
		bool $ajax = true
	): IResponse {
		$container = Environment::getContainer();
		/** @var PresenterFactory $presenterFactory */
		$presenterFactory = $container->getByType(IPresenterFactory::class);
		$presenterName = $presenterFactory->unformatPresenterClass(TestPresenter::class);
		/** @var TestPresenter $presenter */
		$presenter = $presenterFactory->createPresenter($presenterName);
		$presenter->autoCanonicalize = false;
		$presenter->getHttpRequest()
			->setAjaxMock($ajax)
			->setPostMock($post)
			->setRawBodyMock($rawBody)
			->setQueryMock($query);
		return $presenter->run(
			new Request(
				$presenterName,
				IRequest::POST,
				array_merge([TestPresenter::ACTION_KEY => TestPresenter::DEFAULT_ACTION], $query),
				$post
			)
		);
	}

	private function getComponentParam(string $param): string
	{
		return TestPresenter::COMPONENT . '-' . $param;
	}

	/**
	 * @return string[]
	 */
	private function getComponentSignal(): array
	{
		return ['do' => $this->getComponentParam('loadDependentData')];
	}

	private function getFormParam(string $param): string
	{
		return 'frm-' . $this->getComponentParam(TestComponent::FORM) . '-' . $param;
	}

	private function getFormSubmit(): string
	{
		return $this->getComponentParam(TestComponent::FORM . '-submit');
	}
}

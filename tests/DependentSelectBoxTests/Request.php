<?php declare (strict_types = 1);

namespace Wavevision\DependentSelectBoxTests;

use Nette\Http\Request as NetteRequest;
use Nette\Http\UrlScript;

class Request extends NetteRequest
{

	/**
	 * @var bool
	 */
	private $ajaxMock = true;

	/**
	 * @var mixed[]
	 */
	private $postMock = [];

	/**
	 * @var string|null
	 */
	private $rawBodyMock;

	/**
	 * @var mixed[]
	 */
	private $queryMock = [];

	public function __construct()
	{
		parent::__construct(new UrlScript('http://localhost'));
	}

	/**
	 * @param string|null $key
	 * @return mixed|mixed[]
	 */
	public function getPost(?string $key = null)
	{
		return $this->postMock;
	}

	public function getRawBody(): ?string
	{
		return $this->rawBodyMock;
	}

	public function getUrl(): UrlScript
	{
		$url = parent::getUrl();
		return $url->withQuery($this->queryMock);
	}

	public function isAjax(): bool
	{
		return $this->ajaxMock;
	}

	public function isSameSite(): bool
	{
		return true;
	}

	public function setAjaxMock(bool $ajaxMock): self
	{
		$this->ajaxMock = $ajaxMock;
		return $this;
	}

	/**
	 * @param mixed[] $postMock
	 * @return $this
	 */
	public function setPostMock(array $postMock): self
	{
		$this->postMock = $postMock;
		return $this;
	}

	public function setRawBodyMock(?string $rawBodyMock): self
	{
		$this->rawBodyMock = $rawBodyMock;
		return $this;
	}

	/**
	 * @param mixed[] $queryMock
	 * @return $this
	 */
	public function setQueryMock(array $queryMock): self
	{
		$this->queryMock = $queryMock;
		return $this;
	}

}

<?php declare (strict_types = 1);

namespace Wavevision\DependentSelectBoxTests;

use Nette\Application\Routers\RouteList;
use Nette\Configurator;
use Nette\DI\Container;

class Environment
{

	private static Container $container;

	public static function setup(): void
	{
		$configurator = new Configurator();
		$configurator->addConfig(
			[
				'application' => ['mapping' => ['*' => 'Wavevision\DependentSelectBoxTests\Presenters\*Presenter']],
				'services' => ['http.request' => Request::class, 'router' => self::class . '::createRouter'],
			]
		);
		$tempDir = __DIR__ . '/../../temp';
		$configurator->setTempDirectory($tempDir);
		$configurator->addParameters(['wwwDir' => $tempDir]);
		self::$container = $configurator->createContainer();
	}

	public static function getContainer(): Container
	{
		return self::$container;
	}

	public static function createRouter(): RouteList
	{
		$router = new RouteList();
		$router->addRoute('<presenter>/<action>', 'Test:default');
		return $router;
	}

}

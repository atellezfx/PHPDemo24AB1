<?php

use DogtorPET\Backend\Rest\LoginController;
use DogtorPET\Backend\Rest\TipoController;
use DogtorPET\Backend\Rest\MascotaController;
use DogtorPET\Backend\Util\Config;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;
use Tuupola\Middleware\CorsMiddleware;
use Tuupola\Middleware\JwtAuthentication;

require __DIR__ . '/../../vendor/autoload.php';

$app = AppFactory::create();
$config = Config::obtenerInstancia();
$logger = $config->crearLog();

$app->get('/ws/hello/{name}', function (Request $request, Response $response, array $args) {
    $name = $args['name'];
    $response->getBody()->write("Hello, $name");
    return $response;
});

### ENSAMBLANDO LOS INTERMEDIARIOS (MIDDLEWARE) ###############################################
$app->add( new CorsMiddleware([
    'origin'=>['*'], // IMPORTANTE!!: Sólo en fase de desarrollo (no usar en producción)
    'methods' => ['GET','POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    'headers.allow' => ['Authorization', 'Content-Type', '*'],
    'logger' => $logger
]) );

$app->add( new JwtAuthentication([
    'path' => ['/ws'],
    'ignore' => ['/ws/login'],
    'secret' => $config->jwtSecret(),
    'logger' => $logger,
    'secure' => false, // IMPORTANTE!!: Permite llamadas por HTTP (no usar en producción)
    'error' => function($res, $args) {
        $mensaje = ['codigo'=>'error', 'mensaje'=>$args['message']];
        $res->getBody()->write( json_encode( $mensaje ) );
        return $res->withHeader( 'Content-Type', 'application/json' )->withStatus(401);
    }
]) );

### DESPACHANDO LLAMADAS CON EL CONTROLADOR DE LOGIN ##########################################
$app->post('/ws/login', LoginController::class . ':login');

### DESPACHANDO LLAMADAS CON EL CONTROLADOR DE TIPO ###########################################
$app->get('/ws/tipos', TipoController::class .':lista');

### DESPACHANDO LLAMADAS CON EL CONTROLADOR DE MASCOTA ########################################
$app->get('/ws/mascota/{id}', MascotaController::class .':obtener');
$app->get('/ws/mascota/catalogo/{propietario}', MascotaController::class .':lista');
$app->post('/ws/mascota', MascotaController::class . ':insertar');
$app->put('/ws/mascota/{id}', MascotaController::class .':actualizar');
$app->delete('/ws/mascota/{id}', MascotaController::class .':eliminar');

$app->run();
?>
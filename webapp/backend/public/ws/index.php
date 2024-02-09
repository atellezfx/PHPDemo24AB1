<?php

use DogtorPET\Backend\Rest\LoginController;
use DogtorPET\Backend\Rest\TipoController;
use DogtorPET\Backend\Rest\MascotaController;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Slim\Factory\AppFactory;

require __DIR__ . '/../../vendor/autoload.php';

$app = AppFactory::create();

$app->get('/ws/hello/{name}', function (Request $request, Response $response, array $args) {
    $name = $args['name'];
    $response->getBody()->write("Hello, $name");
    return $response;
});

// TODO: Configurar intermediarios (middleware) para habilitar las llamadas remotas (CORS) en fase de desarrollo

### DESPACHANDO LLAMADAS CON EL CONTROLADOR DE LOGIN
$app->post('/ws/login', LoginController::class . ':login');

### DESPACHANDO LLAMADAS CON EL CONTROLADOR DE TIPO
$app->get('/ws/tipos', TipoController::class .':lista');

### DESPACHANDO LLAMADAS CON EL CONTROLADOR DE MASCOTA
$app->get('/ws/mascota/{id}', MascotaController::class .':obtener');
$app->get('/ws/mascotas/{propietario}', MascotaController::class .':lista');

// TODO: Implementar las urls para el webservice de insertar, actualizar y eliminar mascotas

$app->run();
?>
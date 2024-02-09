<?php
namespace DogtorPET\Backend\Rest;

use DogtorPET\Backend\Modelos\Tipo;
use DogtorPET\Backend\Util\DataSource;
use PDO;
use PDOException;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;

class TipoController {

    public function lista(Request $req, Response $res, array $args): Response {
        try{
            $conexion = DataSource::abrirConexion();
            $sentencia = $conexion->prepare( Tipo::SQL_SELECT_TIPOS );
            $sentencia->execute();
            $sentencia->setFetchMode( PDO::FETCH_CLASS, Tipo::class );
            $tipos = $sentencia->fetchAll();
            $res->getBody()->write( json_encode( $tipos ) );
            return $res->withHeader( 'Content-Type', 'application/json' )->withStatus(200);
        } catch(PDOException $e) {
            $mensaje = ['codigo'=>$e->getCode(), 'mensaje'=>$e->getMessage()];
            $res->getBody()->write( json_encode( $mensaje ) );
            return $res->withHeader( 'Content-Type', 'application/json' )->withStatus(500);
        }
    }

}

?>

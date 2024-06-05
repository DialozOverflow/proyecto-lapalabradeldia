<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Topuser;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class TopusersController extends Controller
{
    public function index(){
        $topusers = Topuser::all();
        return response()->json($topusers, Response::HTTP_OK);
    }

    public function store(Request $request){
        $topusers = new Topuser();
        $topusers->nombre = $request->nombre;
        $topusers->tiempo = $request->tiempo;
        $topusers->nivel = $request->nivel;
        $topusers->palabra = $request->palabra;
        $topusers->foto = $request->foto;
        $topusers->save();
        return response()->json($topusers, Response::HTTP_CREATED);
    }

    public function update(Request $request, $id){
        $topusers = Topuser::findOrFail($request->id);
        $topusers->nombre = $request->nombre;
        $topusers->tiempo = $request->tiempo;
        $topusers->nivel = $request->nivel;
        $topusers->palabra = $request->palabra;
        $topusers->foto = $request->foto;
        $topusers->save();
        return response()->json($topusers, Response::HTTP_OK);
    }

    public function destroy($id){
        $topusers = Topuser::destroy($id);
        return response()->json(['message'=> 'Deleted'], Response::HTTP_OK);
    }
}

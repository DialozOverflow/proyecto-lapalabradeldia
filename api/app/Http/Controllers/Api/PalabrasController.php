<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Palabras;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PalabrasController extends Controller
{
    public function index(){
        $palabras = Palabras::all();
        return response()->json($palabras, Response::HTTP_OK);
    }

    public function store(Request $request){
        $palabras = new Palabras();
        $palabras->palabras = $request->palabras;
        $palabras->save();
        return response()->json($palabras, Response::HTTP_CREATED);
    }

    public function update(Request $request, $id){
        $palabras = Palabras::findOrFail($request->id);
        $palabras->palabras = $request->palabras;
        $palabras->save();
        return response()->json($palabras, Response::HTTP_OK);
    }

    public function destroy($id){
        $palabras = Palabras::destroy($id);
        return response()->json(['message'=> 'Deleted'], Response::HTTP_OK);
    }
}

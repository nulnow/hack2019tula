<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Document;


// API Controller
class 😎😎😎 extends Controller
{
    public function 😎()
    {
        return '🥪👀😊😂🤣';
    }

    public function documents()
    {
        return Document::all();
    }

    public function 📝()
    {
        return view('📝');
    }

    public function add📄(Request $request)
    {
        try {
            $📄 = new Document();

            $📄->json_body = $request->input('json_body');
            $📄->type = 1;
    
            $📄->save();
            $📄->refresh();
    
            return $📄;
        } catch(\Exception $e) {
            return $e;
        }
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Document;
use App\DocType;
use setasign\Fpdi;

class API extends Controller
{
    public function addDocumentFrom()
    {
        return view('addDocumentForm');
    }

    public function docTypes()
    {
        return DocType::all();
    }

    public function addDocument(Request $request)
    {
        $type = $request->input('type');
        $fields = $request->input('fields');
        $jsonedFields = json_encode($fields);

        $document = new Document();
        $document->type = $type;
        $document->json_body = $jsonedFields;
        $document->save();
        $document->refresh();

        return $document;
    }

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

    public function printDocument(Document $document)
    {
        require(base_path('vendor/setasign/fpdi/src/autoload.php'));
        $fpdf = new \setasign\Fpdi\TcpdfFpdi();
        // $pdf->setSourceFile('');

        return 'fefe';
    }
}

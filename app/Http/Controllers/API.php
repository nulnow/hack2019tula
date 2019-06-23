<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Document;
use App\DocType;
use setasign\Fpdi\Fpdi;
use setasign\Fpdi\PdfReader;

use setasign\Fpdi\PdfParser\StreamReader;

use Illuminate\Support\Str;


class API extends Controller
{

    public function docTypes()
    {
        return DocType::orderBy('id', 'desc')->get();
    }

    public function addDoctype(Request $request)
    {
        $doctypeName = $request->input('name');
        $fileUrl = $request->input('url');
        $fields = $request->input('fields');

        $docType = new DocType();
        $docType->name = $doctypeName;
        $docType->url = $fileUrl;
        $docType->fields = json_encode($fields);
        $docType->save();
        $docType->refresh();

        return $docType;
    }

    public function documents()
    {
        return Document::orderBy('id', 'desc')->get();
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

    public function printDocument(Document $document, Request $request)
    {
        $type = $document->type;
        $docType = DocType::find($type);
        $realFields = json_decode($document->json_body, true);
        $typeFields = \json_decode($docType->fields, true);

        $img = imagecreatefromjpeg(base_path('storage/app/' . $docType->url));
        $font = base_path("public/times.ttf");

        foreach($typeFields as $typeField) {
            imagettftext($img, 10, 0, $typeField['cords'][0], $typeField['cords'][1], 0, $font, $realFields[$typeField['name']]);
        }

        // OUTPUT IMAGE
        header('Content-type: image/jpeg');
        imagejpeg($img, base_path("storage/app/public/helloImg.jpg"));
        imagedestroy($img);
        return '/storage/helloImg.jpg';
    }

    public function upload(Request $request)
    {
        if ($request->hasFile('img')) {
            $imgHash = Str::random(10);;
            return $path = $request->img->storeAs('public', "$imgHash.jpg");
        }
        return 'kek';
    }
}

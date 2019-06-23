<?php

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::view('/', 'react');
Route::view('/add-document', 'react');
Route::view('/my-documents', 'react');
Route::view('/add-document-type', 'react');

Route::get('/documents', 'API@documents');

Route::get('/doctypes', 'API@docTypes');
Route::post('/doctypes', 'API@addDoctype');

Route::post('/upload-file', 'API@upload');

Route::get('/home', 'HomeController@index')->name('home');
Route::post('/documents', 'API@addDocument');
Route::get('/printDocument', 'API@printTest');
Route::get('/printDocument/{document}', 'API@printDocument');


Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::middleware(['role:admin'])->prefix('web-api')->group(function() {
    Route::middleware('auth')->get('/me', function() {
        return 'you';
    });
    Route::get('/', function() {
        return 'authed';
    });
});


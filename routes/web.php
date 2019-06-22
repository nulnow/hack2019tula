<?php

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
Route::get('/addDocumentForm', 'API@addDocumentFrom');
Route::post('/addDocument', 'API@addDocument');
Route::get('/printDocument', 'API@printTest');
Route::get('/printDocument/{document}', 'API@printDocument');

Route::get('/editor', 'API@📝');
Route::post('/add', 'API@add📄');

Route::get('/doctypes', 'API@docTypes');

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

Route::middleware(['auth', 'role:admin'])->get('/uuuu', 'API@😎');
Route::middleware(['auth', 'role:admin'])->get('/documents', 'API@documents');
Route::middleware(['auth', 'role:admin'])->get('/documents-parsed', 'API@documentsParsed');
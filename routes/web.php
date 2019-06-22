<?php

Route::get('/', function () {
    return view('welcome');
});


Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

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

Route::middleware(['auth', 'role:admin'])->get('/uuuu', function() {
    return 'kek';
});
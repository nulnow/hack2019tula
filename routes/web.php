<?php

Route::get('/', function () {
    return view('welcome');
});

Route::get('/kek', function () {
    return 'HELLO WORLD';
});

Route::prefix('web-api')->group(function() {
    Route::middleware('auth')->get('/me', function() {
        return 'you';
    });
});
Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

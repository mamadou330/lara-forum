<?php

use App\Http\Controllers\CommentController;
use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\TopicController;
use App\Http\Controllers\ProfileController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', [TopicController::class, 'index'])->name('topic.index');
Route::resource('topic', TopicController::class)->except('index');
Route::post('comments/{topic}', [CommentController::class, 'store'])->name('comments.store');
Route::post('reply-comments/{comment}', [CommentController::class, 'replyComment'])->name('reply.comment');
Route::post('markedAsSolution/{comment}', [CommentController::class, 'markedAsSolution'])->name('comment.markedAsSolution');
Route::get('showFromNotification/{topic}/{notification}', [TopicController::class, 'showFromNotification'])->name('topic.showFromNotification');


Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';

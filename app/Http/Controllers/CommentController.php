<?php

namespace App\Http\Controllers;

use App\Models\Topic;
use App\Models\Comment;
use App\Notifications\NewCommentPosted;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Topic $topic)
    {
        $request->validate([
            'content' => ['required', 'string', 'min:5', 'max:255', ]
        ]);
        $topic->comments()->create([
            'content' => $request->content,
            'user_id' => Auth::id()
        ]);

        $topic->user->notify(new NewCommentPosted($topic, Auth::user()));
        
        return back()->with('success', 'Votre commentaire à été envoyé avec succès !');

    }

    /**
     * Store a newly created resource in storage.
     */
    public function replyComment(Request $request, Comment $comment)
    {
        $request->validate([
            'content' => ['required', 'string', 'min:5', 'max:255', ]
        ]);
        $comment->comments()->create([
            'content' => $request->content,
            'user_id' => Auth::id()
        ]);
        return back()->with('success', "Votre réponse au commentaire {{$comment->content}} à été répondu avec succès !");

    }

    /**
     * Store a newly created resource in storage.
     */
    public function markedAsSolution(Request $request, Comment $comment)
    {
        $topic = $request->comment->commentable;

        if (Auth::id() === $topic->user_id) {
            $topic->update(['solution' => $comment->id]);
            return back()->with('success', "Marque comme Solution !");

        } else {
            abort(403, "Vous ne disposez pas de ce privilège");
            // return Inertia::render('Error/403')->with('message', "Vous ne disposez pas de ce privilège");

        }
        return back()->with('success', "Votre réponse au commentaire {{$comment->content}} à été répondu avec succès !");
    }



    /**
     * Display the specified resource.
     */
    public function show(Comment $comment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Comment $comment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Comment $comment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Comment $comment)
    {
        //
    }
}

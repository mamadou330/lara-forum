<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Topic;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use App\Http\Requests\TopicValidatedRequest;
use Illuminate\Notifications\DatabaseNotification;

class TopicController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth')->except('index', 'show');
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $topics = Topic::with('user')->latest()->get();
        // $topics = Topic::with('user')->latest()->paginate(10);

        return Inertia::render('Topics/Index', compact('topics'));
        // return view('topics.index', compact('topics'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // dd();
        return Inertia::render('Topics/Create');

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(TopicValidatedRequest $request)
    {
        $topic = Topic::create($request->validated());
        return to_route('topic.show', $topic)->with('success', "Topic cree avec succes !");
    }

    /**
     * Display the specified resource.
     */
    public function show(Topic $topic)
    {
        $topic = $topic->load('user');
        $topic->load('comments', 'comments.comments');
        return Inertia::render('Topics/Show', compact('topic'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Topic $topic)
    {
        $this->authorize('update', $topic);
        return Inertia::render('Topics/Edit', compact('topic'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(TopicValidatedRequest $request, Topic $topic)
    {
        $this->authorize('update', $topic);
        $topic->update($request->validated());
        return to_route('topic.index')->with('success', "Topic modifie avec succes !");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Topic $topic)
    {
        $this->authorize('delete', $topic);
        $topic->delete();
        return to_route('topic.index')->with('success', "Topic supprime avec succes !");
    }

    public function showFromNotification($topic, DatabaseNotification $notification)
    {
        // dump($notification);
        // dd($topic);
        $topic = Topic::find($topic);
        // dd($topic);

        $notification->markAsRead();
        return to_route('topic.show', $topic)->with('success', "Notification lue avec succes !");;
    }
}

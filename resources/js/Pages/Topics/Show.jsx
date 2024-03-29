import React, { useState } from 'react';
import DangerButton from '@/Components/DangerButton';
import { Head, usePage, Link, useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import SecondaryButton from '@/Components/SecondaryButton';
import Solution from './Solution';
import { comment } from 'postcss';

const formatDate = (d) => {
    const date = new Date(d);
    return date.toLocaleDateString('fr-Fr')

}
const Show = () => {
    const [replyCommentId, setReplyCommentId] = useState(null);
    const { topic, flash, auth } = usePage().props;
    const {
        delete: destroy,
        processing,
    } = useForm({});

    const { comments } = topic;

    const { data, setData, post, errors, recentlySuccessful, progress } = useForm({
        content: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('comments.store', topic), {
            onSuccess: () => setData('content', ''),
        });
    };

    const replyComment = (e, comment) => {
        e.preventDefault();
        post(route('reply.comment', comment), {
            onSuccess: () => setData('content', ''),
        });
    };

    const deleteTopic = (e) => {
        destroy(route('topic.destroy', topic));
    };

    const TopicUser = () => {
        if (auth.user.id === topic.user_id) {
            return (
                <>
                    <Link href={route('topic.edit', topic)} className='w-50 ms-5 inline-flex items-center px-4 py-2 bg-orange-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-orange-500 active:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-warning-500 focus:ring-offset-2 transition ease-in-out duration-150'>Editer ce topic</Link>
                    <DangerButton className="mr-3" onClick={deleteTopic} disabled={processing}>
                        Super ce Topic
                    </DangerButton>
                </>
            )
        }
    }

    const TopicHasSolution = ({ comment }) => {
        if (!topic.solution && auth.user.id === topic.user_id) {
            return (
                <>
                    <TopicUser />
                </>
            )
        } else {
            if (topic.solution === comment.id) {
                return (
                    <h4><p className="inline-block bg-green-500 text-white text-xs px-2 py-1 rounded-full uppercase font-bold">Marqué comme solution</p></h4>
                );
            }
        }
    }

    return (
        <>
            <Head title="Topics" />
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-5">
                <Transition
                    show={recentlySuccessful}
                    enterFrom="opacity-0"
                    leaveTo="opacity-0"
                    className="transition ease-in-out"
                >
                    <p className="text-sm font-bold text-green-800">{flash.success}</p>
                </Transition>
                <Transition
                    show={recentlySuccessful}
                    enterFrom="opacity-0"
                    leaveTo="opacity-0"
                    className="transition ease-in-out"
                >
                    <p className="text-sm font-bold text-red-800">{flash.error}</p>
                </Transition>
                <div className="p-8 flex">
                    <div className="pr-4">
                        <p className="text-md font-bold">{formatDate(topic.created_at)}</p>
                        <p className="text-sm font-bold">{topic.user.name}</p>
                    </div>
                    <div>
                        <div className="uppercase tracking-wide text-xl text-indigo-500 font-semibold">{topic.title}</div>
                        <p className="mt-2 text-gray-500">{topic.content}</p>
                    </div>
                </div>
                <div className='my-5 flex flex-row justify-between items-center'>
                    <TopicUser />

                </div>

            </div>

            <h5 className='text-center text-2xl text-blue-600 my-3'>Commentaires</h5>
            {comments?.map((comment) => (
                <React.Fragment key={comment.id}>
                    <div key={comment.id} className="max-w-md mx-auto bg-white  md:max-w-2xl m-2">
                        {comment.content}
                        <div className="my-5 flex flex-row justify-between items-center">
                            <div>
                                <p className="text-md">Posté {formatDate(comment.created_at)}</p>
                                <p className="inline-block bg-blue-500 text-white text-xs px-2 py-1 rounded-full uppercase font-bold">{comment.user.name}</p>
                            </div>
                            <TopicHasSolution comment={comment} />
                        </div>
                        <hr />
                        {comment.comments?.map((subComment) => (
                            <React.Fragment key={subComment.id}>
                                <div key={subComment.id} className="max-w-md mx-auto bg-white ml-9  md:max-w-2xl m-1">
                                    {subComment.content}
                                    <div className="my-5 flex flex-row justify-between items-center">
                                        <p className="text-md">Posté {formatDate(subComment.created_at)}</p>
                                        <p className="inline-block bg-blue-500 text-white text-xs px-2 py-1 rounded-full uppercase font-bold">{subComment.user.name}</p>
                                    </div>
                                    <hr />
                                </div>
                            </React.Fragment>
                        ))}
                        <SecondaryButton onClick={() => setReplyCommentId(comment.id)} className='bg-indigo-800 mt-3 text-white hover:bg-indigo-900'> Répondre</SecondaryButton>
                        {replyCommentId === comment.id && (
                            <form onSubmit={(e) => replyComment(e, comment)} className="mt-6 space-y-6 mx-6 ml-8" id={comment.id}>
                                <div>
                                    <InputLabel htmlFor="content" value="Votre Réponse" />
                                    <TextInput
                                        type="textarea"
                                        id="content"
                                        className="mt-1 block w-full"
                                        value={data.content}
                                        onChange={(e) => setData('content', e.target.value)}
                                        required
                                        autoComplete="content"
                                    />
                                    <InputError className="mt-2" message={errors.content} />
                                </div>
                                <div className="flex items-center gap-4">
                                    <PrimaryButton className='my-2 ' disabled={processing}>Soumettre ma réponse</PrimaryButton>
                                </div>
                            </form>
                        )}
                    </div>
                </React.Fragment>
            ))}

            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-5">
                <form onSubmit={submit} className="mt-6 space-y-6 mx-6" id={comment.id}>
                    {progress && (
                        <progress value={progress.percentage} max="100">
                            {progress.percentage}%
                        </progress>
                    )}
                    <div>
                        <InputLabel htmlFor="content" value="Votre Commentaire" />

                        <TextInput
                            type="textarea"
                            id="content"
                            className="mt-1 block w-full"
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                            required
                            autoComplete="content"
                        />
                        <InputError className="mt-2" message={errors.content} />
                    </div>

                    <div className="flex items-center gap-4">
                        <PrimaryButton className='my-2 ' disabled={processing}>Soumettre mon commentaire</PrimaryButton>
                    </div>
                </form>
            </div>

        </>
    )
}

export default Show

import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

const Create = ({auth}) => {

    const { data, setData, post, errors, processing, recentlySuccessful, progress } = useForm({
        title: '',
        content: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('topic.store'));
    };

	return (
		<>
            <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Créer un nouveau Topic </h2>}
        >
            <Head title="Création Topic" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                        {progress && (
                            <progress value={progress.percentage} max="100">
                                {progress.percentage}%
                            </progress>
                        )}
                            <form onSubmit={submit} className="mt-6 space-y-6">

                                <div>
                                    <InputLabel htmlFor="title" value="Title" />

                                    <TextInput
                                        id="title"
                                        className="mt-1 block w-full"
                                        value={data.title}
                                        onChange={(e) => setData('title', e.target.value)}
                                        required
                                        isFocused
                                        autoComplete="title"
                                    />

                                    <InputError className="mt-2" message={errors.title} />
                                </div>

                                <div>
                                    <InputLabel htmlFor="content" value="Content" />

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
                                    <PrimaryButton disabled={processing}>Enregistrer</PrimaryButton>

                                    <Transition
                                        show={recentlySuccessful}
                                        enterFrom="opacity-0"
                                        leaveTo="opacity-0"
                                        className="transition ease-in-out"
                                    >
                                        <p className="text-sm text-gray-600">Enregistrement</p>
                                    </Transition>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            </AuthenticatedLayout>
		</>
	)
}

export default Create

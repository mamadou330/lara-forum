import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

const Edit = ({auth}) => {
    const {topic} = usePage().props;
    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm({
        title: topic.title,
        content: topic.content,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('topic.update', topic));
    };

	return (
		<>
            <AuthenticatedLayout
            user={auth.user}
            header={<h4 className="font-semibold text-xl text-gray-800 leading-tight">Modification du Topic {topic.title}</h4>}
        >
            <Head title="Modification Topic" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
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
                                    <PrimaryButton disabled={processing}>Modifier</PrimaryButton>

                                    <Transition
                                        show={recentlySuccessful}
                                        enterFrom="opacity-0"
                                        leaveTo="opacity-0"
                                        className="transition ease-in-out"
                                    >
                                        <p className="text-sm text-gray-600">Modification</p>
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

export default Edit;

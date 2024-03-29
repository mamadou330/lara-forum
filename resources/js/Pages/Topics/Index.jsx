import { useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, usePage, Link, useForm } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

const formatDate = (d) => {
    const date = new Date(d);
    return date.toLocaleDateString('fr-Fr')

}
const formatTime = (d) => {
    const date = new Date(d);
    return date.toLocaleTimeString('fr-Fr')
}


export default function Index() {
    const { topics, flash } = usePage().props;
    const { recentlySuccessful, progress } = useForm({});
    // console.log(flash);
    // const [currentPage, setCurrentPage] = useState(topics.current_page);

    const changePage = (page) => {
        setCurrentPage(page);
        // Inertia.get(`/topics?page=${page}`);

        // Inertia.get(route('topics.index', { page: page }));

        // Faites une requête pour charger les topics de la nouvelle page ici
    };

    return (
        <>
            <Head title="Topics" />
            <div className="sm:fixed sm:top-0 sm:right-0 p-6 text-right">

                <>
                    <Link
                        href={route('topic.create')}
                        className="ml-4 font-semibold text-gray-600 hover:text-gray-900 ligth:text-gray-400 ligth:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                    >
                        Créer un topic
                    </Link>
                </>
            </div>
            <div className="py-12">
                <h1 className="text-center font-semibold  mb-7">Liste des topics</h1>
                <Transition
                    show={recentlySuccessful}
                    enterFrom="opacity-0"
                    leaveTo="opacity-0"
                    className="transition ease-in-out"
                >
                    <p className="text-sm font-bold text-red-800">{flash.error}</p>
                </Transition>
                <ul className="max-w-2xl mx-auto border border-gray-200 rounded overflow-hidden shadow-md">
                    {topics?.map((topic, index) => (
                        <li key={index} className="px-4 py-2 border-b-2 bg-white hover:bg-sky-100 border-gray-200 transition-all duration-300 ease-in-out">
                            <h4 className="hover:text-sky-900 ">
                                <Link href={route('topic.show', topic)}>{topic.title}</Link>
                            </h4>
                            <p className="my-3">{topic.content}</p>
                            <div className="flex flex-row">
                                <p className="flex-initial w-50">Posté le {formatDate(topic.created_at)} à {formatTime(topic.created_at)}</p>
                                <p className="flex-initial w-50 badge-pill ms-32">{topic.user.name}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* <nav aria-label="Page navigation example">
                <ul className="inline-flex -space-x-px">
                    {topics.prev_page_url && (
                        <li>
                            <a href="#" onClick={() => changePage(currentPage - 1)}
                                className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 ml-0 rounded-l-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                        </li>
                    )}
                    {Array.from({ length: topics.last_page }, (_, i) => i + 1).map((page) => (
                        <li key={page}>
                            <a href="#" onClick={() => changePage(page)}
                                className={`bg-${page === currentPage ? 'blue' : 'white'} border border-gray-300 text-${page === currentPage ? 'blue' : 'gray'}-500 hover:bg-${page === currentPage ? 'blue' : 'gray'}-100 hover:text-${page === currentPage ? 'blue' : 'gray'}-700  py-2 px-3 dark:border-gray-700 dark:bg-gray-700 dark:text-white`}>{page}</a>
                        </li>
                    ))}
                    {topics.next_page_url && (
                        <li>
                            <a href="#" onClick={() => changePage(currentPage + 1)}
                                className="bg-white border border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-r-lg leading-tight py-2 px-3 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                        </li>
                    )}
                </ul>
            </nav> */}
        </>
    );
}


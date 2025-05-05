import { useCallback, useEffect, useState } from "react";

import type { RepositoryListResponse } from "@/api/repository";
import { getRepositoryList } from "@/api/repository";
import useBoolean from "@/hooks/use-boolean/use-boolean";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: Repositories,
});

function Repositories() {
	const [repositories, setRepositories] = useState<RepositoryListResponse>([]);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const loading = useBoolean(true);

	const fetchRepositories = useCallback(async () => {
		try {
			const response = await getRepositoryList();
			setRepositories(response.data);
		} catch (error) {
			const errorMessage =
				error instanceof Error
					? error.message
					: "Failed to fetch repositories.";
			setErrorMessage(errorMessage);
		} finally {
			loading.setFalse();
		}
	}, [loading.setFalse]);

	useEffect(() => {
		fetchRepositories();
	}, [fetchRepositories]);

	if (loading.value)
		return (
			<output
				aria-live="polite"
				className="min-h-screen flex items-center justify-center bg-[#282c34] text-white"
			>
				<span className="text-lg animate-pulse">Loading repositories…</span>
			</output>
		);

	if (errorMessage)
		return (
			<output
				aria-live="assertive"
				className="min-h-screen flex items-center justify-center bg-[#282c34] text-red-400"
			>
				<span className="text-lg font-semibold">{errorMessage}</span>
			</output>
		);

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-[#282c34] text-white relative">
			<header className="w-full max-w-2xl mx-auto p-4">
				<h1 className="text-3xl font-bold mb-6 text-center">
					GitHub Repositories
				</h1>
				<ul className="space-y-4">
					{repositories.map((repo) => (
						<li
							key={repo.id}
							aria-label={`Repository: ${repo.full_name}`}
							className="bg-[#23272f] rounded-lg p-4 shadow hover:bg-[#1a1d23] focus:outline-none focus:ring-2 focus:ring-[#61dafb]"
						>
							<Link
								from={Route.fullPath}
								to={`/${repo.full_name}`}
								target="_blank"
								rel="noopener noreferrer"
								className="text-[#61dafb] text-xl font-semibold hover:underline"
								aria-label={`Open ${repo.full_name} on GitHub`}
							>
								{repo.full_name}
							</Link>
							<p className="mt-2 text-base text-gray-300">{repo.description}</p>
						</li>
					))}
				</ul>
			</header>
		</div>
	);
}

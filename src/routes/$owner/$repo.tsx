import { useCallback, useEffect, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";

import type { Repository } from "@/api/repository";
import {
	getRepository,
	getRepositoryCommits,
	getRepositoryLanguages,
	getRepositoryReadme,
} from "@/api/repository";
import type {
	RepositoryCommitResponse,
	RepositoryLanguagesResponse,
} from "@/api/repository";

import useBoolean from "@/hooks/use-boolean";
import { createFileRoute, useParams } from "@tanstack/react-router";

import { Card } from "@chakra-ui/react";

export const Route = createFileRoute("/$owner/$repo")({
	component: RepositoryDetail,
});

function RepositoryDetail() {
	const params = useParams({ from: Route.fullPath });
	const [repository, setRepository] = useState<Repository | null>(null);
	const [errors, setErrors] = useState<{
		message: string;
		details: string;
	} | null>(null);
	const loading = useBoolean(true);

	const [starred, setStarred] = useState(false);
	const [starCount, setStarCount] = useState<number>(0);

	const [languages, setLanguages] = useState<RepositoryLanguagesResponse>({});
	const loadingDetails = useBoolean(true);

	const [commits, setCommits] = useState<RepositoryCommitResponse>([]);

	const [readme, setReadme] = useState<string>("");

	const fetchRepository = useCallback(async () => {
		setErrors(null);
		try {
			const response = await getRepository({
				full_name: `${params.owner}/${params.repo}`,
			});
			setRepository(response.data);
			setStarCount(response.data.stargazers_count);
		} catch (err) {
			setErrors({
				message: "Failed to load repository details.",
				details: "Failed to load repository details.",
			});
		} finally {
			loading.setFalse();
		}
	}, [params.owner, params.repo, loading.setFalse]);

	const fetchRepositoryLanguages = useCallback(async () => {
		if (!repository) return;
		setErrors(null);
		try {
			const response = await getRepositoryLanguages({
				full_name: `${params.owner}/${params.repo}`,
			});
			setLanguages(response.data);
		} catch (err) {
			setErrors({
				message: "Failed to load repository details.",
				details: "Failed to load repository details.",
			});
		}
	}, [params.owner, params.repo, repository]);

	const fetchRepositoryCommits = useCallback(async () => {
		if (!repository) return;
		setErrors(null);
		try {
			const response = await getRepositoryCommits({
				full_name: `${params.owner}/${params.repo}`,
				per_page: 5,
			});
			setCommits(response.data);
		} catch (err) {
			setErrors({
				message: "Failed to load repository details.",
				details: "Failed to load repository details.",
			});
		}
	}, [params.owner, params.repo, repository]);

	const fetchRepositoryReadme = useCallback(async () => {
		if (!repository) return;
		setErrors(null);
		try {
			const response = await getRepositoryReadme({
				full_name: `${params.owner}/${params.repo}`,
			});
			const content = atob(response.data.content.replace(/\n/g, ""));
			setReadme(content);
		} catch (err) {
			setErrors({
				message: "Failed to load repository details.",
				details: "Failed to load repository details.",
			});
		}
	}, [params.owner, params.repo, repository]);

	useEffect(() => {
		fetchRepository();
	}, [fetchRepository]);

	useEffect(() => {
		Promise.all([
			fetchRepositoryLanguages(),
			fetchRepositoryCommits(),
			fetchRepositoryReadme(),
		]).finally(() => {
			loadingDetails.setFalse();
		});
	}, [
		loadingDetails.setFalse,
		fetchRepositoryLanguages,
		fetchRepositoryCommits,
		fetchRepositoryReadme,
	]);

	const handleStarClick = useCallback(() => {
		setStarred((prev) => {
			const next = !prev;
			setStarCount((count) => count + (next ? 1 : -1));
			return next;
		});
	}, []);

	const languageTotal = useMemo(
		() => Object.values(languages).reduce((a, b) => a + b, 0),
		[languages],
	);

	if (loading.value)
		return (
			<div className="min-h-screen flex items-center justify-center bg-[#282c34] text-white">
				<span className="text-lg animate-pulse">Loading repository…</span>
			</div>
		);

	if (errors?.message)
		return (
			<div className="min-h-screen flex items-center justify-center bg-[#282c34] text-red-400">
				<span className="text-lg font-semibold">{errors.message}</span>
			</div>
		);

	if (!repository) return null;

	return (
		<div className="min-h-screen bg-[#181a20] text-white px-4 py-8 flex flex-col items-center">
			<div className="w-full max-w-2xl bg-[#23272f] rounded-lg shadow-lg p-6">
				<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
					<div>
						<h1 className="text-2xl font-bold mb-1">{repository.name}</h1>
						<p className="text-sm text-gray-400 mb-1">
							by <span className="font-semibold">{repository.owner.login}</span>
						</p>
						{repository.description && (
							<p className="text-base text-gray-300">
								{repository.description}
							</p>
						)}
					</div>
					<button
						type="button"
						aria-label={starred ? "Unstar repository" : "Star repository"}
						onClick={handleStarClick}
						className="flex items-center gap-2 px-4 py-2 rounded bg-yellow-500 text-black font-semibold shadow hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-300 transition"
					>
						<svg
							className={`w-5 h-5 ${starred ? "fill-yellow-600" : "fill-none"} stroke-yellow-700`}
							viewBox="0 0 24 24"
							strokeWidth={2}
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M11.48 3.499a1 1 0 0 1 1.04 0l2.77 1.6a1 1 0 0 0 .74.13l3.1-.6a1 1 0 0 1 1.18 1.18l-.6 3.1a1 1 0 0 0 .13.74l1.6 2.77a1 1 0 0 1 0 1.04l-1.6 2.77a1 1 0 0 0-.13.74l.6 3.1a1 1 0 0 1-1.18 1.18l-3.1-.6a1 1 0 0 0-.74.13l-2.77 1.6a1 1 0 0 1-1.04 0l-2.77-1.6a1 1 0 0 0-.74-.13l-3.1.6a1 1 0 0 1-1.18-1.18l.6-3.1a1 1 0 0 0-.13-.74l-1.6-2.77a1 1 0 0 1 0-1.04l1.6-2.77a1 1 0 0 0 .13-.74l-.6-3.1A1 1 0 0 1 6.87 4.63l3.1.6a1 1 0 0 0 .74-.13l2.77-1.6z"
							/>
						</svg>
						<span>{starCount}</span>
					</button>
				</div>

				<div className="mb-6">
					<h2 className="text-lg font-semibold mb-2">Languages</h2>
					{loadingDetails.value ? (
						<p className="text-gray-400">Loading…</p>
					) : errors?.details ? (
						<p className="text-red-400">{errors.details}</p>
					) : Object.keys(languages).length === 0 ? (
						<p className="text-gray-400">No language data.</p>
					) : (
						<div className="flex flex-col gap-2">
							<div className="flex h-4 w-full rounded overflow-hidden bg-gray-700">
								{Object.entries(languages).map(([lang, value]) => (
									<div
										key={lang}
										style={{
											width: `${((value / languageTotal) * 100).toFixed(2)}%`,
										}}
										className="h-full"
										aria-label={`${lang}: ${((value / languageTotal) * 100).toFixed(1)}%`}
										title={lang}
									/>
								))}
							</div>
							<div className="flex flex-wrap gap-2 mt-1">
								{Object.entries(languages).map(([lang, value]) => (
									<span
										key={lang}
										className="text-xs text-gray-300 bg-gray-800 rounded px-2 py-0.5"
									>
										{lang}: {((value / languageTotal) * 100).toFixed(1)}%
									</span>
								))}
							</div>
						</div>
					)}
				</div>

				<div className="mb-6">
					<h2 className="text-lg font-semibold mb-2">Recent Commits</h2>
					{loadingDetails.value ? (
						<p className="text-gray-400">Loading…</p>
					) : errors?.details ? (
						<p className="text-red-400">{errors.details}</p>
					) : commits.length === 0 ? (
						<p className="text-gray-400">No commits found.</p>
					) : (
						<ul className="space-y-3">
							{commits.map((commit) => (
								<li
									key={commit.sha}
									className="flex items-start gap-3 bg-gray-800 rounded p-3"
								>
									{commit.author?.avatar_url && (
										<img
											src={commit.author.avatar_url}
											alt={commit.author.login}
											className="w-8 h-8 rounded-full"
										/>
									)}
									<div>
										<p className="text-sm font-semibold text-gray-100">
											{commit.commit.message}
										</p>
										<p className="text-xs text-gray-400 mt-1">
											by {commit.commit.author.name} on{" "}
											{new Date(commit.commit.author.date).toLocaleString()}
										</p>
									</div>
								</li>
							))}
						</ul>
					)}
				</div>

				<div>
					<h2 className="text-lg font-semibold mb-2">README</h2>
					{loadingDetails.value ? (
						<p className="text-gray-400">Loading…</p>
					) : errors?.details ? (
						<p className="text-red-400">{errors.details}</p>
					) : readme ? (
						<div className="prose prose-invert max-w-none bg-gray-900 rounded p-4">
							<ReactMarkdown>{readme}</ReactMarkdown>
						</div>
					) : (
						<p className="text-gray-400">No README found.</p>
					)}
				</div>
			</div>
		</div>
	);
}

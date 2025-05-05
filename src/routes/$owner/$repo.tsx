import { useCallback, useEffect, useState } from "react";

import type { Repository } from "@/api/repository";
import { getRepository } from "@/api/repository";
import useBoolean from "@/hooks/use-boolean";
import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/$owner/$repo")({
	component: RepositoryDetail,
});

function RepositoryDetail() {
	const params = useParams({ from: Route.fullPath });
	const [repository, setRepository] = useState<Repository | null>(null);
	const [error, setError] = useState<string | null>(null);
	const loading = useBoolean(true);

	const fetchRepository = useCallback(async () => {
		setError(null);
		try {
			const response = await getRepository({
				full_name: `${params.owner}/${params.repo}`,
			});
			setRepository(response.data);
		} catch (err) {
			setError("Failed to load repository details.");
		} finally {
			loading.setFalse();
		}
	}, [params.owner, params.repo, loading.setFalse]);

	useEffect(() => {
		fetchRepository();
	}, [fetchRepository]);

	if (loading.value)
		return (
			<div className="min-h-screen flex items-center justify-center bg-[#282c34] text-white">
				<span className="text-lg animate-pulse">Loading repository…</span>
			</div>
		);

	if (error)
		return (
			<div className="min-h-screen flex items-center justify-center bg-[#282c34] text-red-400">
				<span className="text-lg font-semibold">{error}</span>
			</div>
		);

	if (!repository) return null;

	return null;
}

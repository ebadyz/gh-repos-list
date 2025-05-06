export type RepositoryOwner = Readonly<{
	login: string;
	id: number;
	node_id: string;
	avatar_url: string;
	gravatar_id: string;
	url: string;
	html_url: string;
	followers_url: string;
	following_url: string;
	gists_url: string;
	starred_url: string;
	subscriptions_url: string;
	organizations_url: string;
	repos_url: string;
	events_url: string;
	received_events_url: string;
	type: string;
	user_view_type: string;
	site_admin: boolean;
}>;

type License = Readonly<{
	key: string;
	name: string;
	spdx_id: string;
	url: string;
	node_id: string;
}>;

export type Repository = Readonly<{
	id: number;
	node_id: string;
	name: string;
	full_name: string;
	private: boolean;
	owner: RepositoryOwner;
	html_url: string;
	description: string;
	fork: boolean;
	url: string;
	forks_url: string;
	keys_url: string;
	collaborators_url: string;
	teams_url: string;
	hooks_url: string;
	issue_events_url: string;
	events_url: string;
	assignees_url: string;
	branches_url: string;
	tags_url: string;
	blobs_url: string;
	git_tags_url: string;
	git_refs_url: string;
	trees_url: string;
	statuses_url: string;
	languages_url: string;
	stargazers_url: string;
	contributors_url: string;
	subscribers_url: string;
	subscription_url: string;
	commits_url: string;
	git_commits_url: string;
	comments_url: string;
	issue_comment_url: string;
	contents_url: string;
	compare_url: string;
	merges_url: string;
	archive_url: string;
	downloads_url: string;
	issues_url: string;
	pulls_url: string;
	milestones_url: string;
	notifications_url: string;
	labels_url: string;
	releases_url: string;
	deployments_url: string;
	created_at: string;
	updated_at: string;
	pushed_at: string;
	git_url: string;
	ssh_url: string;
	clone_url: string;
	svn_url: string;
	homepage: string;
	size: number;
	stargazers_count: number;
	watchers_count: number;
	language: string;
	has_issues: boolean;
	has_projects: boolean;
	has_downloads: boolean;
	has_wiki: boolean;
	has_pages: boolean;
	has_discussions: boolean;
	forks_count: number;
	mirror_url: string | null;
	archived: boolean;
	disabled: boolean;
	open_issues_count: number;
	license: License | null;
	allow_forking: boolean;
	is_template: boolean;
	web_commit_signoff_required: boolean;
	topics: ReadonlyArray<string>;
	visibility: string;
	forks: number;
	open_issues: number;
	watchers: number;
	default_branch: string;
	score: number;
}>;

export type RepositoryLanguagesResponse = Readonly<Record<string, number>>;

export type RepositoryListResponse = Readonly<{
	items: ReadonlyArray<Repository>;
	total_count: number;
	incomplete_results: boolean;
}>;

export type RepositoryListParams = Partial<{
	q: string;
	sort: string;
	order: string;
	per_page: number;
	page: number;
}>;

export type RepositoryParams = Pick<Repository, "full_name">;

type CommitPerson = Readonly<{
	name: string;
	email: string;
	date: string;
}>;

type CommitTree = Readonly<{
	sha: string;
	url: string;
}>;

type CommitVerification = Readonly<{
	verified: boolean;
	reason: string;
	signature: string | null;
	payload: string | null;
	verified_at?: string;
}>;

type CommitParent = Readonly<{
	sha: string;
	url: string;
	html_url: string;
}>;

type CommitUser = RepositoryOwner;

export type Commit = Readonly<{
	sha: string;
	node_id: string;
	commit: Readonly<{
		author: CommitPerson;
		committer: CommitPerson;
		message: string;
		tree: CommitTree;
		url: string;
		comment_count: number;
		verification: CommitVerification;
	}>;
	url: string;
	html_url: string;
	comments_url: string;
	author: CommitUser | null;
	committer: CommitUser | null;
	parents: ReadonlyArray<CommitParent>;
}>;

export type RepositoryCommitResponse = ReadonlyArray<Commit>;

type ReadmeLinks = Readonly<{
	self: string;
	git: string;
	html: string;
}>;

export type ReadmeResponse = Readonly<{
	name: string;
	path: string;
	sha: string;
	size: number;
	url: string;
	html_url: string;
	git_url: string;
	download_url: string | null;
	type: string;
	content: string;
	encoding: string;
	_links: ReadmeLinks;
}>;

export type RepositoryQueryKey =
	| "all"
	| "repositories"
	| "getDetails"
	| "getCommits"
	| "getLanguages"
	| "getReadme";

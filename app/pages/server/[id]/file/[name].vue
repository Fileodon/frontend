<template>
	<div>
		<layout-header
			:title="name"
			header="File editor"
			description="Edit file content from your browser"
		/>
		<section
			id="overview"
			class="card w-full h-fit border border-base-300 bg-base-100 shadow-sm mt-5"
		>
			<button
				class="btn btn-soft btn-error w-xs"
				@click="returnToOverview"
			>
				Go back
			</button>
			<section
				id="table"
				class="flex-1 h-full bg-black/35 border-gray-600 border m-2"
			>
				<VueMonacoEditor
					v-model:value="code"
					theme="vs-dark"
					height="70vh"
					@mount="handleEditorMount"
				/>
			</section>
		</section>
	</div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { computed, ref } from 'vue'
import VueMonacoEditor from '@guolao/vue-monaco-editor'

const route = useRoute()
const router = useRouter()
const id = computed(() => {
	const value = route.params.id
	return Array.isArray(value) ? value[0] ?? '' : value ?? ''
})
const name = computed(() => {
	const value = route.params.name
	return Array.isArray(value) ? value[0] ?? '' : value ?? ''
})
const ext = computed(() => {
	const value = name.value
	if (!value.includes('.')) {
		return ''
	}
	return value.split('.').pop() ?? 'plaintext'
})

// Monaco editor has auto completion for js and ts only
function handleEditorMount(
	editor: import('monaco-editor').editor.IStandaloneCodeEditor,
	monaco: typeof import('monaco-editor'),
) {
	const fileName = String(route.params.name ?? '')
	const extension = fileName.slice(fileName.lastIndexOf('.')).toLowerCase()

	const language = monaco.languages.getLanguages().find(({ extensions }) =>
		extensions?.some(ext => ext.toLowerCase() === extension),
	)

	const model = editor.getModel()
	if (language && model) {
		monaco.editor.setModelLanguage(model, language.id)
	}
}

let content = ''

if (name.value?.includes('.cs')) {
	content = `
using Microsoft.AspNetCore.RateLimiting;
using System.Security.Claims;
using System.Threading.RateLimiting;

namespace Controller.Middleware;

public sealed class RateLimit(IConfiguration configuration) : IRateLimiterPolicy<string>
{
    private readonly IConfiguration _configuration = configuration;

    public RateLimitPartition<string> GetPartition(HttpContext httpContext)
    {
        string key = GetPartitionKey(httpContext);

        int permitLimit = GetPositiveSetting("PermitLimit", 120);
        int queueLimit = GetNonNegativeSetting("QueueLimit", 0);
        int windowMinutes = GetPositiveSetting("WindowMinutes", 1);

        return RateLimitPartition.GetFixedWindowLimiter(
            key,
            _ => new FixedWindowRateLimiterOptions
            {
                PermitLimit = permitLimit,
                QueueLimit = queueLimit,
                QueueProcessingOrder = QueueProcessingOrder.OldestFirst,
                Window = TimeSpan.FromMinutes(windowMinutes)
            });
    }

    public Func<OnRejectedContext, CancellationToken, ValueTask>? OnRejected =>
        (context, token) =>
        {
            context.HttpContext.Response.StatusCode = StatusCodes.Status429TooManyRequests;
            context.HttpContext.Response.ContentType = "text/plain; charset=utf-8";

            if (context.Lease.TryGetMetadata(MetadataName.RetryAfter, out TimeSpan retryAfter))
            {
                int retryAfterSeconds = Math.Max(1, (int)Math.Ceiling(retryAfter.TotalSeconds));
                context.HttpContext.Response.Headers.RetryAfter = retryAfterSeconds.ToString();
                return new ValueTask(context.HttpContext.Response.WriteAsync(
                    $"Rate limit exceeded. Please try again in {retryAfterSeconds} seconds.",
                    token));
            }

            return new ValueTask(context.HttpContext.Response.WriteAsync(
                "Rate limit exceeded. Please try again later.",
                token));
        };

    private int GetPositiveSetting(string name, int defaultValue)
    {
        int value = _configuration.GetValue($"RateLimiting:{name}", defaultValue);
        return value > 0
            ? value
            : throw new InvalidOperationException(
                $"RateLimiting:{name} must be greater than zero.");
    }

    private int GetNonNegativeSetting(string name, int defaultValue)
    {
        int value = _configuration.GetValue($"RateLimiting:{name}", defaultValue);
        return value >= 0
            ? value
            : throw new InvalidOperationException(
                $"RateLimiting:{name} must be zero or greater.");
    }

    private static string GetPartitionKey(HttpContext httpContext)
    {
        if (httpContext.User.Identity?.IsAuthenticated == true)
        {
            string? userId = httpContext.User.FindFirstValue(ClaimTypes.NameIdentifier)
                ?? httpContext.User.FindFirstValue("sub")
                ?? httpContext.User.FindFirstValue("unique_name");

            if (!string.IsNullOrWhiteSpace(userId))
            {
                return $"user:{userId}";
            }
        }

        string? ipAddress = httpContext.Connection.RemoteIpAddress?.ToString();
        return string.IsNullOrWhiteSpace(ipAddress) ? "ip:unknown" : $"ip:{ipAddress}";
    }
}`
}
else if (name.value?.includes('.c')) {
	content = `
#include "../include/websocketClient.h"
#include <concord/discord.h>
#include <concord/logmod.h>
#include <curl/curl.h>
#include <pthread.h>

int main(int argc, char *argv[]) {
  (void)argc;
  (void)argv;

  CURLcode code = curl_global_init(CURL_GLOBAL_ALL);
  if (code != CURLE_OK) {
    logmod_log(FATAL, NULL, "curl_global_init() failed: %s\n",
               curl_easy_strerror(code));
    return 1;
  }

  pthread_t ws_thread = 0;
  if (pthread_create(&ws_thread, NULL, websocket_thread_main, NULL) != 0) {
    logmod_log(FATAL, NULL, "Failed to create WebSocket thread");
    curl_global_cleanup();
    return 1;
  }

  pthread_join(ws_thread, NULL);
  curl_global_cleanup();
  ccord_global_cleanup();
  return 0;
}`
}
else {
	content = ''
}

function returnToOverview() {
	const server = route.params.id
	router.push(`/server/${server}`)
}

const code = ref(content)
</script>

<style>
</style>

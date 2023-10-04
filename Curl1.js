//Data Retrival

curl --request GET \
--url https://intent-kit-16.hasura.app/api/rest/blogs \
--header 'x-hasura-admin-secret: 32qR4KmXOIpsGPQKMqEJHGJS27G5s7HdSKO3gdtQd2kv5e852SiYwWNfxkZOBuQ6'

//Blog Statistics (Blog Stats):
curl --request GET \
--url http://localhost:3000/api/blog-stats

//Blog Search:
curl --request GET \

--url http://localhost:3000/api/blog-search?query=privacy

//Cached Blog Statistics (Bonus Challenge):

curl --request GET \
--url http://localhost:3000/api/cached-blog-stats


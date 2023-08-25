Post.delete_all
100.times do
  title = Faker::Lorem.sentence( word_count: 6 )
  body = 100.times.map {
    "<p>#{Faker::Lorem.paragraph( sentence_count: 30 )}</p>"
  }.join("\n")
  Post.create({
    title: title,
    body: body
  })
end

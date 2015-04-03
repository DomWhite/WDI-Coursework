require 'pry'

require_relative "person"

File.open('database.txt', 'a+') do |file| #Use block to close file

	print "Add a person? (y/n)"
	response = gets.chomp.downcase

	while response == 'y'

		print "name: "
		name = gets.chomp

		print "Age: "
		age = gets.chomp

		print "Gender: "
		gender = gets.chomp

		file.puts "#{name}, #{age}, #{gender}"

		print "Add a person? (y/n)"
		response = gets.chomp.downcase

	end

end						#end of file block

people = []

File.open('database.txt', 'r') do |file|

	file.each do |line|
		data = line.split(',')
		person = Person.new(data[0], data[1], data[2])
		people << person
	end

end

people.each do |person|				#people.each { |person| puts person}
	puts person
end

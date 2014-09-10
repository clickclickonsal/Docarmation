# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
MaintenanceType.destroy_all
MaintenanceType.create [
{name: "Oil Change"},
{name: "Tire Rotation"},
{name: "Vehicle Alignment"},
{name: "Transmission Flush"},
{name: "Brake Flush"},
{name: "Coolant Flush"},
{name: "Tire Balance"}
]
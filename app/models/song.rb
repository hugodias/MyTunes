class Song < ActiveRecord::Base
  attr_accessible :file, :title, :album, :artist, :tracknum
  has_attached_file :file

end

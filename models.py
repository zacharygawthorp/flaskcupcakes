
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

DEFAULT_IMAGE = "https://tinyurl.com/demo-cupcake"


"""Models for Cupcake app."""
class Cupcake(db.Model):
    __tablename__ ="cupcakes"

    id = db.Column(db.Integer, primary_key=True)
    flavor = db.Column(db.Text, nullable=False)
    size = db.Column(db.Text, nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    image = db.Column(db.Text, nullable=False, default= DEFAULT_IMAGE)

    def to_dict(self):
        """Seriallize cupcake to a dict of cupcake info."""

        return {
            "id": self.id,
            "flavor": self.flavor,
            "rating": self.rating,
            "size": self.size,
            "image": self.image,
        }



def connect_db(app):
    """Connect database to Flask app."""

    db.app = app
    db.init_app(app)
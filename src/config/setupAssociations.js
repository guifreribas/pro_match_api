import Card from "#models/cardModel.js";
import Category from "#models/categoryModel.js";
import Competition from "#models/competitionModel.js";
import Field from "#models/fieldModel.js";
import Foul from "#models/foulModel.js";
import Goal from "#models/goalModel.js";
import Match from "#models/matchModel.js";
import Organization from "#models/organizationModel.js";
import Player from "#models/playerModel.js";
import Result from "#models/resultModel.js";
import Team from "#models/teamModel.js";
import TeamPlayer from "#models/teamPlayerModel.js";
import User from "#models/userModel.js";

export function setupAssociations() {
    Card.belongsTo(Match, { foreignKey: "match_id" });
    Card.belongsTo(Player, { foreignKey: "player_id" });
    Card.belongsTo(Team, { foreignKey: "team_id" });

    Category.belongsTo(Organization, { foreignKey: "organization_id" });
    Category.belongsTo(User, { foreignKey: "user_id" });
    Category.belongsTo(Competition, { foreignKey: "competition_id" });

    Competition.hasMany(Category, { foreignKey: "competition_id" });
    Competition.hasMany(Field, { foreignKey: "competition_id" });
    Competition.hasMany(Organization, { foreignKey: "competition_id" });

    Field.belongsTo(Organization, { foreignKey: "organization_id" });
    Field.belongsTo(Competition, { foreignKey: "competition_id" });
    Field.belongsTo(User, { foreignKey: "user_id" });

    Foul.belongsTo(Match, { foreignKey: "match_id" });
    Foul.belongsTo(Player, { foreignKey: "player_id" });
    Foul.belongsTo(Team, { foreignKey: "team_id" });

    Goal.belongsTo(Match, { foreignKey: "match_id" });
    Goal.belongsTo(Player, { foreignKey: "player_id" });
    Goal.belongsTo(Team, { foreignKey: "team_id" });

    Match.belongsTo(Category, { foreignKey: "category_id" });
    Match.belongsTo(Team, { foreignKey: "local_team" });
    Match.belongsTo(Team, { foreignKey: "visitor_team" });
    Match.hasMany(Card, { foreignKey: "match_id" });
    Match.hasMany(Foul, { foreignKey: "match_id" });
    Match.hasMany(Goal, { foreignKey: "match_id" });
    Match.hasMany(Result, { foreignKey: "match_id" });

    Organization.belongsTo(Competition, { foreignKey: "competition_id" });
    Organization.belongsTo(User, { foreignKey: "user_id" });
    Organization.hasMany(Category, { foreignKey: "organization_id" });

    Result.belongsTo(Match, { foreignKey: "match_id" });
    Match.hasOne(Result, { foreignKey: "match_id" });
    Match.hasMany(Goal, { foreignKey: "match_id" });

    Player.belongsTo(User, { foreignKey: "user_id" });
    Player.hasMany(TeamPlayer, { foreignKey: "player_id" });
    Player.hasMany(Card, { foreignKey: "player_id" });
    Player.hasMany(Foul, { foreignKey: "player_id" });
    Player.hasMany(Goal, { foreignKey: "player_id" });

    // Team.belongsTo(Category, { foreignKey: "category_id" });
    // Team.belongsTo(Organization, { foreignKey: "organization_id" });
    Team.hasMany(TeamPlayer, { foreignKey: "team_id" });
    Team.belongsTo(User, { foreignKey: "user_id" });

    TeamPlayer.belongsTo(Team, { foreignKey: "team_id" });
    TeamPlayer.belongsTo(Player, { foreignKey: "player_id" });
    TeamPlayer.belongsTo(User, { foreignKey: "user_id" });

    User.hasMany(Category, { foreignKey: "user_id" });
    User.hasMany(Organization, { foreignKey: "user_id" });
    User.hasMany(Player, { foreignKey: "user_id" });
    User.hasMany(Team, { foreignKey: "user_id" });
}
